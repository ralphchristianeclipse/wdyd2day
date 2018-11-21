import React, { useState, useEffect } from 'react';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Value } from 'slate';
import {
  Button,
  SvgIcon,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from '@material-ui/core';

import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Plain from 'slate-plain-serializer';
interface SlateEditorValue {
  value: Value;
  [key: string]: any;
}

const styles = {
  editor: { padding: '10px' }
};

const defaults = {
  editor: {
    placeholder: 'Tell me something'
  }
};

const icons = [
  {
    icon: 'accessible'
  }
];

const Icons = ({ icons }: any) =>
  icons.map((icon: any) => (
    <Grid item xs={4}>
      <SvgIcon className={icon.icon}>{icon}</SvgIcon>
    </Grid>
  ));

const isImage = url => !!imageExtensions.find(url.endsWith);

const insertImage = (editor, src, target) => {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: 'image',
    data: { src }
  });
};
const onDropOrPaste = (event, editor, next) => {
  const target = getEventRange(event, editor);
  if (!target && event.type === 'drop') return next();

  const transfer = getEventTransfer(event);
  const { type, text, files } = transfer as any;

  if (type === 'files') {
    for (const file of files) {
      const reader = new FileReader();
      const [mime] = file.type.split('/');
      if (mime !== 'image') continue;

      reader.addEventListener('load', () => {
        editor.command(insertImage, reader.result, target);
      });

      reader.readAsDataURL(file);
    }
    return;
  }

  if (type === 'text') {
    if (!isUrl(text)) return next();
    if (!isImage(text)) return next();
    editor.command(insertImage, text, target);
    return;
  }

  next();
};

const mutation = gql`
  mutation PostCreate($data: PostInput) {
    postCreate(data: $data) {
      id
    }
  }
`;
const RichTextEditor = () => {
  const initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph'
        }
      ]
    }
  });

  const [loading, setLoading] = useState(false);
  const [hasSlateValue, setHasSlateValue] = useState(false);
  const [slateValue, setSlateValue] = useState(initialValue);
  const sendMessage = useMutation(mutation);

  const handleSlateValue = ({ value }: SlateEditorValue) => {
    setSlateValue(value);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    await sendMessage({
      variables: {
        data: {
          body: Plain.serialize(slateValue)
        }
      }
    });
    setLoading(false);
  };

  useEffect(
    () => {
      setHasSlateValue(!slateValue.isEmpty);
    },
    [slateValue]
  );

  return (
    <Card style={{ margin: 'auto', marginTop: '20px', width: '80%' }}>
      <CardHeader title={hasSlateValue && <h1>What did you do today ❓</h1>} />
      <CardContent>
        {/* <Grid container spacing={8}>
        <Icons icons={icons} />
      </Grid> */}
        <Editor
          style={styles.editor}
          value={slateValue}
          onChange={handleSlateValue}
          autoFocus={true}
          {...defaults.editor}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          style={{ width: '100%' }}
          onClick={handleButtonClick}
          disabled={loading}
        >
          <h3> 📩 Send 🚀</h3>
        </Button>
      </CardActions>
    </Card>
  );
};

export default RichTextEditor;

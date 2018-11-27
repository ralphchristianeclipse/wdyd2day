import post from './post';
import pubsub from '../pubsub';
interface Model {
  create: (data: any) => Promise<any>;
  update: (id: number | string, data: any) => Promise<any>;
  remove: (id: number | string) => Promise<any>;
}

const publishByType = (key, type, data) => {
  const name = `${key.toUpperCase()}_${type}`;
  pubsub.publish(name, data);
  return { [key]: { mutation: type, data } };
};

const addPubSubToModel = (key: string, model: Model) => ({
  ...model,
  create: async data => {
    const result = await model.create(data);
    return publishByType(key, 'CREATED', { ...data, ...result });
  },
  update: async data => {
    const result = await model.create(data);
    return publishByType(key, 'UPDATED', { ...data, ...result });
  },
  remove: async data => {
    const result = await model.create(data);
    return publishByType(key, 'REMOVED', { ...data, ...result });
  }
});

const models = {
  post
};

const reactiveModels = Object.entries(models).reduce(
  (models, [key, model]) => (
    (models[key] = addPubSubToModel(key, model)), models
  ),
  {}
);

export default reactiveModels;

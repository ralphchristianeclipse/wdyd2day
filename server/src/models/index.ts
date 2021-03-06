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
    publishByType(key, 'CREATED', { ...data, ...result });
    return result;
  },
  update: async (id, data) => {
    const result = await model.update(id, data);
    publishByType(key, 'UPDATED', { ...data, ...result });
    return result;
  },
  remove: async id => {
    const result = await model.remove(id);
    publishByType(key, 'REMOVED', { ...result });
    return { id };
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

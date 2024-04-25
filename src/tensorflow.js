import * as tf from '@tensorflow/tfjs';

const init = () => {
  const xs = tf.tensor2d([1, 2, 3, 4, 5], [5, 1]);
  const ys = tf.tensor2d([2, 4, 6, 8, 10], [5, 1]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd'
  });

  model.fit(xs, ys, {
    epochs: 1000,
    callbacks: {
      onEpochEnd: async (epoch, log) => {
        console.log(`Epoch ${epoch}, Loss: ${log.loss}`);
      }
    }
  }).then(res => {
    model.evaluate(xs, ys).then(results => {
      console.log('Test loss:', results.loss);
    });

    const prediction = model.predict(tf.tensor2d([1, 2, 3, 4, 5], [5, 1]));
    prediction.print();

  })
}


export { init }
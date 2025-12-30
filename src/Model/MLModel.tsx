import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';

const MLModel = () => {
  const [result, setResult] = useState<string | null>(null);
  const [input, setInput] = useState<string | null>(null);

  const modelRef = useRef<tf.Sequential | null>(null);

  const trainModel = async () => {
    // Always build a NEW model
    const model = tf.sequential();

    model.add(
      tf.layers.dense({
        units: 1,
        inputShape: [1],
      }),
    );

    model.compile({
      optimizer: tf.train.adam(0.1),
      loss: 'meanSquaredError',
    });

    const xs = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    const ys = tf.tensor1d([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46]);

    await model.fit(xs, ys, { epochs: 300 });

    xs.dispose();
    ys.dispose();

    modelRef.current = model;
    console.log('Model trained & stored');
  };

  useEffect(() => {
    trainModel();
  }, []);

  const predict = async () => {
    if (!input || modelRef.current === null) return;
    try {
      console.log('input', input);

      const tensor = tf.tensor1d([parseFloat(input)]);
      console.log('tensor', tensor);
      const prediction = modelRef.current.predict(tensor) as tf.Tensor;
      setResult(prediction.dataSync()[0].toFixed(0));
      tensor.dispose();
      prediction.dispose();
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('Error making prediction');
    }
  };

  return (
    <div>
      <input type='number' value={input ?? ''} onChange={e => setInput(e.target.value)} placeholder='Enter a number' />
      <button onClick={predict}>Predict</button>
      {result && <div>Prediction: {result}</div>}
    </div>
  );
};

export default MLModel;

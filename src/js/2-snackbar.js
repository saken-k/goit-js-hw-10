import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const makePromise = ({ value, delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delayValue = form.elements['delay'].value;
  const stateValue = form.elements['state'].value;

  const shouldResolve = stateValue === 'fulfilled';

  makePromise({ value: stateValue, delay: delayValue, shouldResolve })
    .then(value =>
      iziToast.success({
        message: `Fulfilled promise in ${delayValue} ms`,
        position: 'topCenter',
      })
    )
    .catch(error =>
      iziToast.error({
        message: `Rejected promise in ${delayValue} ms`,
        position: 'topCenter',
      })
    );

  form.reset();
});

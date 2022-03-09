let counter = 0;

const itemsCounter = (ref) => {
  if (typeof ref === 'object') {
    counter = ref.length;
  }
  return counter;
};

export default itemsCounter;

import { Children } from 'react';

export const calculateBoundingBoxes = (children) => {
  const boundingBoxes = {};

  Children.forEach(children, (child) => {
    const domNode = child.ref.current;
    const nodeBoundingBox = domNode.getBoundingClientRect();

    boundingBoxes[child.key] = nodeBoundingBox;
  });

  return boundingBoxes;
};

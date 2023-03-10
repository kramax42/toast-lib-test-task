import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastsContainer } from '@/components/ToastsContainer';
import { usePrevious } from '@/hooks';
import { toastManager } from '@/services/toast-manager.service';

export const ToastServices = memo(function ToastServices({
  position,
  toastsGap,
  indent,
}) {
  const { bindContainerRef } = toastManager;
  const containerRef = useRef();
  const previousPosition = usePrevious(position || null);

  useEffect(() => {
    if (containerRef && position !== previousPosition) {
      bindContainerRef({ containerRef, position, previousPosition });
    }
  }, [bindContainerRef, containerRef, position, previousPosition]);

  return (
    <ErrorBoundary>
      <ToastsContainer
        ref={containerRef}
        position={position}
        indent={indent}
        toastsGap={toastsGap}
      />
    </ErrorBoundary>
  );
});

ToastServices.propTypes = {
  position: PropTypes.string.isRequired,
  toastsGap: PropTypes.number.isRequired,
  indent: PropTypes.number.isRequired,
};

import PropTypes from 'prop-types';
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Toast } from '@/components/Toast';
import { VerticalAnimationList } from '@/components/VerticalAnimationList';
import { usePortal } from '@/hooks/portal.hook';
import { toastManager } from '@/services/toast-manager.service';

import { Container } from './styled';

export const ToastsPortal = forwardRef(
  ({ position, indent, toastsGap }, ref) => {
    const [toasts, setToasts] = useState([]);

    const { isLoading: isPortalLoading, portalNode } = usePortal(position);

    const removeToastById = (id) => () => {
      toastManager.removeToast({ id, position });
    };

    useImperativeHandle(ref, () => ({
      updateToasts: (updatedToasts) => {
        setToasts([...updatedToasts]);
      },
    }));

    if (isPortalLoading) {
      return null;
    }

    const portalChildren = (
      <Container indent={indent} position={position} toastsGap={toastsGap}>
        <VerticalAnimationList>
          {toasts
            .slice(0, toastManager.getMaxToastsOnScreen())
            .map(
              ({
                id,
                message,
                duration,
                isAutoClose,
                variant,
                animation,
                colorConfig,
              }) => (
                <Toast
                  id={id}
                  key={id}
                  ref={createRef()}
                  message={message}
                  removeToast={removeToastById(id)}
                  duration={duration}
                  variant={variant}
                  animationVariant={animation}
                  isAutoClose={isAutoClose}
                  colorConfig={colorConfig}
                />
              ),
            )}
        </VerticalAnimationList>
      </Container>
    );

    return createPortal(portalChildren, portalNode);
  },
);

ToastsPortal.propTypes = {
  position: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  toastsGap: PropTypes.number.isRequired,
};
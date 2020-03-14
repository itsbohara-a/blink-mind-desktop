import React from 'react';
import cx from 'classnames';
import { BaseProps } from '@blink-mind/renderer-react';
import { BlockType, OpType } from '@blink-mind/core';

interface Props extends BaseProps {
  hover: boolean;
}

export function OLTopicCollapseIcon(props: Props) {
  const { controller, hover, topic } = props;
  const canCollapse = topic.subKeys.size > 0;
  const collapse = topic.collapse && canCollapse;
  const dotClassName =
    hover && canCollapse
      ? cx('icon', 'iconfont', {
          'bm-plus': collapse,
          'bm-minus': !collapse
        })
      : cx('dot', { 'dot-collapse': collapse });

  const onClickDot = () => {
    if (canCollapse) {
      controller.run('operation', {
        ...props,
        opType: OpType.TOGGLE_COLLAPSE
      });
    }
  };

  const dotProps = {
    className: dotClassName,
    onClick: onClickDot
  };

  const descBlock = topic.getBlock(BlockType.DESC).block;

  let descCollapseIcon = <div className='bm-collapse-icon'/>;
  if (descBlock) {
    const descCollapseIconProps = {
      className: cx('icon', 'iconfont', {
        'bm-s-plus': descBlock.data.collapse,
        'bm-s-minus': !descBlock.data.collapse
      }),
      onClick: () => {
        controller.run('operation', {
          ...props,
          opType: OpType.SET_TOPIC_BLOCK,
          blockType: BlockType.DESC,
          data: descBlock.data.set('collapse', !descBlock.data.collapse)
        });
      }
    };

    descCollapseIcon = <div {...descCollapseIconProps} />;
  }

  return (
    <div className="bm-collapse-icons">
      {/*<Icon className={iconClassName(IconName.PLUS)} />*/}
      {descCollapseIcon}
      <div {...dotProps} />
    </div>
  );
}
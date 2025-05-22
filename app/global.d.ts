declare module 'dify-client';
declare module 'uuid';

// JSX型定義の追加
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

"use client";

import dayjs from "dayjs";
import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import idID from "antd/locale/id_ID";
import Entity from "@ant-design/cssinjs/es/Cache";

import "dayjs/locale/id";
dayjs.locale("id");

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);

  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider locale={idID}>{children}</ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;

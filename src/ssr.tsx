import React from "react";
import { Hono } from "hono";
import ReactDOMServer from "react-dom/server";
import { StartServer } from "@tanstack/start/server";
import { createMemoryHistory } from "@tanstack/react-router";

import { createRouter } from "./router";

const app = new Hono();
app.all("/*", async (c) => {
  const router = createRouter();

  const memoryHistory = createMemoryHistory();

  router.update({
    history: memoryHistory,
  });

  await router.load();

  const appHtml = ReactDOMServer.renderToString(
    <StartServer router={router} />
  );
  return c.html(appHtml);
});

export default app;

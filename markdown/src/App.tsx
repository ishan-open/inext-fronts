//https://marked.js.org/using_pro
// https://github.com/developit/snarkdown
import { useEffect, useState } from "react";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

import {
  Sandpack,
  SandpackLayout,
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

import RaceGameBrilliant from "./embedded/race-game?raw";
import DraggingJs from "./embedded/dragging.js?raw";
import gameMdxContent from "./mdx/game.mdx?raw";

import "./override.css";
const code = (__html: string) => `
import { RaceGameBrilliant } from "./embedded.tsx";

export default function App() {
  return <div>
    <div dangerouslySetInnerHTML={{__html: \`${__html}\`}} />
    <RaceGameBrilliant />
     <div dangerouslySetInnerHTML={{__html: \`${__html}\`}} />
    <iframe style={{
        border: '0',
        outline: '0',
        width: '100%',
        height: '1000px',
        minHeight: '160px',
        maxHeight: '2000px',
        flex: '1',
    }} src="https://js13kgames.com/games/packabunchas/index.html" />
  </div>
}`;
export default function App() {
  // VFile
  const [file, setFile] = useState<any>();
  useEffect(() => {
    console.log("file?raw", gameMdxContent);
    const processor = async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(gameMdxContent || "# Hello, Neptune!");
      setFile(file);
    };
    processor();
  }, []);

  console.log("file.toString()", String(file));
  if (!file) return null;
  return (
    // RaceGameBrilliant;
    // <Sandpack
    //   template="react"
    //   files={{ "/App.js": code(String(file)) }}
    //   customSetup={{
    //     files: {
    //       "/embedded.tsx": RaceGameBrilliant,
    //       "/dragging.js": DraggingJs,
    //     },
    //     dependencies: {
    //       react: "17.0.2",
    //       "react-dom": "17.0.2",
    //       "react-scripts": "4.0.0",
    //       "pixi.js": "6.2.2",
    //     },
    //   }}
    // />

    <SandpackProvider
      template="react"
      customSetup={{
        files: {
          "/App.js": code(String(file)),
          "/embedded.tsx": RaceGameBrilliant,
          "/dragging.js": DraggingJs,
          "/reset.css": `body {margin: 0}`,
        },
        dependencies: {
          react: "17.0.2",
          "react-dom": "17.0.2",
          "react-scripts": "4.0.0",
          "pixi.js": "6.2.2",
        },
      }}
    >
      <SandpackLayout>
        <SandpackPreview
          showRefreshButton={false}
          showOpenInCodeSandbox={false}
        />
        {/*<SandpackCodeEditor />*/}
      </SandpackLayout>
    </SandpackProvider>
  );
}

// need the pre-bundle process
// TODO: Test with non esm env
// <RaceGameMdx />

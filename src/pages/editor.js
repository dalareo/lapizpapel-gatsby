import React from 'react';
import { WysiwygEditor } from '@remirror/editor-wysiwyg';
import { Link } from "gatsby"
import Layout from "../components/layout"
import Button from "../components/button"

function Editor({ location }) {
  return (
    <Layout location={location}>
      <h1>Un editor sencillo</h1>
      <WysiwygEditor />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
        >
        <li>
          <Link to="/">
            <Button marginTop="5px">Inicio</Button>
          </Link>
        </li>
        <li>
          <Link to="/units/">
            <Button marginTop="5px">Contenidos</Button>
          </Link>
        </li>
      </ul>
    </Layout>
  )    
}

export default Editor;

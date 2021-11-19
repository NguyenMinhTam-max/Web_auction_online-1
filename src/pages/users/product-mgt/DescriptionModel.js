import ProductModal from './ProductModal';
import {
  Box,
  Button,
  makeStyles,
  Typography,
  TextField,
} from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '60rem',
    maxWidth: '90%',
    margin: '0 auto',
    overflow: 'hidden',
  },

  content: {
      background: '#fff',
      padding: theme.spacing(2),
      marginTop: '10vh',
  },
  
  title: {
    fontWeight: 'bold',
    display: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },

  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxHeight: '500px',
    minHeight: '500px',
    overflow: 'hidden',
  },

  wrapperClass: {
    padding: '1rem',
    border: '1px solid #ccc',
  },
  
  editorClass: {
    maxheight: '400px',
    height: '400px',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    backgroundColor: 'lightgray',
    padding: '1rem',
    border: '1px solid #ccc',
  },

  toolbarClass: {
    border: '1px solid #ccc',
  },

  preview: {
    padding: '1rem',
    marginTop: '1rem',
  },

}));

const UpdateDescription = ({ isOpen, onClose, setStateDescription }) => {
  const classes = useStyles();
  
  const [editText, setEditText] = useState(() => EditorState.createEmpty());

  const closeModalHandler = () => {
    onClose();
  };

  const handleEditorChange = (state) => {
    setEditText(state);
    const a = convertToHTML(editText.getCurrentContent());
    setStateDescription(a);
  }

  // const createMarkup = (html) => {
  //   console.log(html)
  //   return  {
  //     __html: DOMPurify.sanitize(html)
  //   }
  // }

  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div>   
        <Box borderRadius={6} className={classes.content}>
          <Box>
            <Box>
                <Typography variant="h5" className={classes.title}>
                Mô Tả
                </Typography>
            </Box>
            <Box marginBottom={2} className={classes.section}>
                <Editor 
                    editorState={editText}
                    wrapperClassName={classes.wrapperClass}
                    editorClassName={classes.editorClass}
                    toolbarClassName={classes.toolbarClass}
                    onEditorStateChange={handleEditorChange}
                />
                {/* <div className={classes.preview} dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
            </Box>
            <Box marginTop={2} alignItems="center">
                <Button 
                variant="contained" 
                color="primary" 
                onClick={onClose}>
                    Lưu
                </Button>
            </Box>
          </Box>
        </Box>
      </div>
  </ProductModal>
  );
};
export default UpdateDescription;

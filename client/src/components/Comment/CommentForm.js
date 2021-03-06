import React from "react";
// import Comments from "./Comments";
// import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';
import '../Drinks/Form.css'


const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}

// const EditorComponent = () => <Editor />

class CommentForm extends React.Component {
  state = { 
    review: '',
  };

  componentDidMount() {
    if (this.props.comment) {
      const { review } = this.props.comment;
      this.setState({ review: review });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };


  handleSubmit = (e) => {
    e.preventDefault();

    this.props.add(this.state);
    this.setState({review: ''})
  };


editImage = () => {
  const {review} = this.state;
  return (
    <Form onSubmit={this.handleSubmit}>
        <textarea
          cols='200'
          rows='8'
          placeholder="Comment"
          name="review"
          value={review}
          onChange={this.handleChange}
          required
        />
      {/* <Grid.Column width={4}>
        {/* <Dropzone
          onDrop={this.onDrop}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                style={styles.dropzone}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )
          }}
        </Dropzone> */}
      {/* </Grid.Column> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <hr/>
<button class='ui fluid button'>Submit</button>

    </Form>
  )
}


render() {
  const { review } = this.state
  return (
    <div className='format'>
      <br/>
      <br/>
      <h3 className='formTitle'>Tell us what you think and leave a comment</h3>
        <div className='centering'>
          <this.editImage />
        </div>
    </div>
  )
}
}


export default CommentForm;
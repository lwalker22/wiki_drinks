import React, { Fragment, } from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';
import Dropzone from 'react-dropzone'; //Import Dropzone
//Copied from lecture notes
const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';
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
class Profile extends React.Component {
  state = { editing: false, formValues: { name: '', email: '', file: '', }, };
  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0], } });
  }
  editView = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { name, email, file, } } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
          <Dropzone
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
          </Dropzone>
        {/* </Grid.Column> */}
      {/* <Grid.Column width={8}>   lecture left out the below code to add form */}
            <Form.Input
            label="Username"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />
          <Button>Update</Button>
        {/* </Grid.Column> */}
      </Form>
    )
  }
  componentDidMount() {
    const { auth: { user: { name, email, }, }, } = this.props;
    this.setState({ formValues: { name, email, }, });
  }
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { name, email, file, }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { name, email, file, });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }
  profileView = () => {
    const { auth: { user }, } = this.props;
    return (
      <div>
          <Image src={user.image || defaultImage} />
          <Header as="h1">{user.name}</Header>
          <Header as="h1">{user.email}</Header>
      </div>
    );
  }
  render() {
    const { editing, } = this.state;
    return (
      <Container>
        <Grid>
        <Divider hidden />
          <Grid.Row>
            { editing ? this.editView() : this.profileView()}
            <Grid.Column>
              <Button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth => 
      <Profile { ...props } auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedProfile;
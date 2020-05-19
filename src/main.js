import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
const db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Main() {
  const [data, setData] = useState();
  const [search, setSearch] = useState(null);
  const [clicked, setClick] = useState(false);
  const [button, setButton] = useState(false);
  const [param, setParam] = useState("intitle:");
  const classes = useStyles();

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleClick() {
    setClick(true);
    setButton(!button);
  }

  function handleAuthor(props) {
    if(props.authors === undefined) {
      return "Unknown";
    }
    return props.authors[0];
  }

  function handleImage(props) {
    if(props.imageLinks === undefined) {
      console.log("Image does not exist, going to default");
      return "https://blogs.edweek.org/edweek/finding_common_ground/6%20Books.jpg";
    }
    return props.imageLinks.thumbnail;
  }

  function handleAdd(props) {
    db.collection("library")
      .doc(props.volumeInfo.title)
      .set({
        title: props.volumeInfo.title,
        author: handleAuthor(props.volumeInfo), 
        image: handleImage(props.volumeInfo),
        id: props.id,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  // THIS FETCH NEEDS REPLACING
  useEffect(() => {
    if (search) {
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          param +
          search +
          "&key=" +
          process.env.REACT_APP_GOOGLE_API_KEY
      )
        .then((res) => res.json())
        .then((res) => {
          const all = res.items;
          console.log(all);
          setData(all);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [button]);

  //
  // SERVER REWORK AREA
  //

  // useEffect(() => {
  //   if (search) {
  //     //fetch("/api/books?title=the+outlanders") //to local host
  //     fetch(
  //       "https://www.googleapis.com/books/v1/volumes?q=" +
  //         param +
  //         search +
  //         "&key=" +
  //         process.env.REACT_APP_GOOGLE_API_KEY
  //     )
  //       .then((res) => res.json())
  //       .then((res) => {
  //         const all = res.items;
  //         console.log(all);
  //         setData(all);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [button]);

  function MapData() {
    try {
      if (data && clicked) {
        return (
          <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((item) => {
              return (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={handleImage(item.volumeInfo)}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.volumeInfo.title}
                      </Typography>
                      <Typography>
                        Author: {handleAuthor(item.volumeInfo)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handleAdd(item)} size="small" color="primary">
                        Save
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
        );
      }
      return <div></div>;
    } catch (error) {
      console.log("There was an error mapping data!");
      return <div>Search returned nothing!</div>;
    }
  }

  const handleChange = (event) => {
    setParam(event.target.value);
  };

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Librario Search
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Choose a search parameter and search below for your favorite books
            to add to your library!
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Parameters
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={param}
                    onChange={handleChange}
                  >
                    <MenuItem value={"inauthor:"}>Author</MenuItem>
                    <MenuItem value={"intitle:"}>Title</MenuItem>
                    <MenuItem value={"inpublisher:"}>Publisher</MenuItem>
                    <MenuItem value={"isbn:"}>ISBN</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="searchquery"
                  name="searchquery"
                  label="Enter keywords:"
                  value={search}
                  onChange={handleSearch}
                  fullWidth
                  autoComplete="fname"
                />
              </Grid>
              <Grid item>
                <Button style={{height:50, backgroundColor: "#4153af", color:"white"}} onClick={() => handleClick()}>Search</Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <MapData />
    </>
  );
}

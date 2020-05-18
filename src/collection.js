import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function Collection() {
    const [data, setData] = useState(null);
    const [found, setFound] = useState(false);
    const classes = useStyles();

    // delete book
    function handleClick(props) {
      db.collection("library").doc(props).delete().then(function() {
        console.log("Document successfully deleted");
        setFound(false)
        getData()
      }).catch(function(error) {
        console.log("Error deleting document: ", error);
      });
    }
  
    // get collection data 
    function getData() {
      if (!found) {
        db.collection("library")
          .get()
          .then((querySnapshot) => {
            const books = querySnapshot.docs.map((doc) => doc.data());
            console.log(books); 
            setData(books);
          })
          .catch(function (error) {
            console.error("Error reading document: ", error);
          });
        setFound(true);
      }
    }
    getData();
  
    // render stuff 
    if (!data) return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{display: "flex", justifyContent: "center"}}>
         <CircularProgress />  
      </div>
    </>
    )
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
            Librario Collection
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Review your collection!
          </Typography>
        </Container>
      </div>
                  <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography>
                      Author: {item.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleClick(item.title)} size="small" color="primary">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>


        {/* {data.map((item) => (
          <div key={item.title}>
            <h1>{item.title}</h1>
            <Button onClick={() => handleClick(item.title)}>Delete</Button>
          </div>
        ))} */}
      </>
    );
  }
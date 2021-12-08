import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header"

const useStyles = makeStyles(() => ({
  container: {
    margin: "3rem 0 4rem"
  }
}))

type WrapperProps = {
  children: React.ReactElement
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="row" justifyContent="center">
            <Grid item>
              {children}
            </Grid>   
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Wrapper
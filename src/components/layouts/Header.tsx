import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import { Auth } from "aws-amplify"

import { UserContext } from "../App"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  }
}))

const Header: React.FC = () => {
  const { setCurrentUser } = useContext(UserContext)

  const classes = useStyles()

  // サインアウトボタンを設置
  const signout = () => {
    Auth.signOut().catch((err: any) => console.log(err))
    setCurrentUser(undefined)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            Sample
          </Typography>
          <Button
            onClick={signout}
            color="inherit"
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
import { Fragment, useState } from "react";
import React, {Suspense} from 'react';
import { Container, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { PutUserApi, useUser } from '../../state/user/users';

export default function EditUser () {
	const user = useUser();
	const [open, setOpen] = useState(false);
	const [result, setResult] = useState(false);
	const [errorMessages, setErrorMessages] = useState({});

	function handleOpen() {
        setOpen(!open);
    }

	function handleClose() {
		setOpen(!open);
	}

	function handleChange(e) {
		user({
			[e.target.name]: e.target.value
		});
	}

	// const handleChange = e => {
  //       const {name, value} = e.target;
  //       user([name], value);
  // }

	const handleSubmit = e => {
		e.preventDefault();
		setErrorMessages({});
		PutUserApi(user, user.token)
            .then((data) => {
                setResult(data);
            })
            .catch(setErrorMessages);
	}
	
	return (
		<Fragment>
			<Tooltip title="Edit details" placement="top">
				<IconButton onClick={handleOpen}>
					<EditIcon color="primary"/>
				</IconButton>
			</Tooltip>
			<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm">
				<DialogTitle>Edit details {user.token.toString()} </DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="fullName"
								type="text"
								label="name"
								placeholder="name"
								value={user.fullName}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}  
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
		</Fragment>
	);
}
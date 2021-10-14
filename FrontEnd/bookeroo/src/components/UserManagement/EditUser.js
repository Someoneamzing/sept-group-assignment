import { Fragment, useState } from "react";
import React, {Suspense, useEffect, setAlertOpen, setState} from 'react';
import { Container, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { putUserApi, useUser, useRefreshUser } from '../../state/user/users';
import { useAuthUser } from "../../state/user/authentication";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Collapse } from '@material-ui/core';

export default function EditUser () {
	const user = useUser();
	const refreshUser = useRefreshUser();
	const authUser = useAuthUser();
	const [placeholder, setPlaceholder] = useState(user);
	const [form, setForm] = useState({});
	const [open, setOpen] = useState(false);
	// const [result, setResult] = useState(false);
	const [errorMessages, setErrorMessages] = useState({});
	const [alertOpen, setAlertOpen] = useState(true);


	function handleOpen() {
		setForm({});
		setPlaceholder(user);
    setOpen(!open);
  }

	function handleClose() {
		setOpen(!open);
	}

	// function handleChange(e) {
	// 	debugger
	// 	setErrorMessages({});
	// 	setText({
	// 		[e.target.name]: e.target.value
	// 	});

	// }

	const handleChange = e => {
		setPlaceholder({
			...placeholder,
			[e.target.name]: e.target.value
		})
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

	// const handleChange = e => {
  //       const {name, value} = e.target;
  //       user([name], value);
  // }

	const handleSubmit = e => {
		e.preventDefault();
		setErrorMessages({});
		putUserApi(form, authUser.token)
            .then((data) => {
                // setResult(data);
								handleClose();
								refreshUser();
            })
            .catch(setErrorMessages);
	}

	useEffect(() => {
		setAlertOpen(!!errorMessages['message']);
	}, [errorMessages]);

	
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
				<DialogTitle>Edit details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								error={!!errorMessages['fullName']}
								name="fullName"
								type="text"
								label="name"
								placeholder="name"
								value={placeholder.fullName}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}  	
								fullWidth
								style={{ paddingBottom: '2vh' }}
								helperText={errorMessages['fullName']}
							/>
							<TextField
								error={!!errorMessages['username']}
								name="username"
								type="text"
								label="username"
								placeholder="Username"
								value={placeholder.username}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}  
								fullWidth
								style={{ paddingBottom: '2vh' }}
								helperText={errorMessages['username']}
							/>
							<TextField
								error={!!errorMessages['password']}
								name="password"
								type="text"
								label="password"
								placeholder="Password"
								value={null}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}  
								fullWidth
								style={{ paddingBottom: '2vh' }}
								helperText={errorMessages['password']}
							/>
							<TextField
								error={!!errorMessages['confirmPassword']}
								name="confirmPassword"
								type="text"
								label="confirm password"
								placeholder="confirm password"
								value={null}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}  
								fullWidth
								style={{ paddingBottom: '2vh' }}
								helperText={errorMessages['confirmPassword']}
							/>
							{errorMessages['message'] && (
									<Collapse in={alertOpen}>
											<Alert
													severity="warning"
													action={
															<IconButton
																	aria-label="close"
																	color="inherit"
																	size="small"
																	onClick={() => {
																			setAlertOpen(false);
																	}}
															>
																	<CloseIcon fontSize="inherit" />
															</IconButton>
													}
											>
													{errorMessages['message']}
											</Alert>
									</Collapse>
							)}
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
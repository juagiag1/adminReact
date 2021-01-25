import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Tab,
  Tabs,
  Box,
  Container,
  CircularProgress,
} from "@material-ui/core";

import CustomersPage from "../customersPage/CustomersPage";
import ProductsPage from "../productsPage/ProductsPage";
import SuccessDialog from "../shared/SuccessDialog";
import NavBar from "../navBar/NavBar";
import "./AdminPage.scss";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminPage() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="admin-container">
      <NavBar />
      <AppBar position="static">
        <Container>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            id="tabs-panel"
          >
            <Tab label="Customers" {...a11yProps(0)} />
            <Tab label="Products" {...a11yProps(1)} />
          </Tabs>
        </Container>
      </AppBar>
      <Container
        style={{ opacity: loading ? 0.5 : 1 }}
        className="main-container"
      >
        <TabPanel value={value} index={0}>
          <CustomersPage
            setLoading={setLoading}
            setError={setError}
            setMessage={setMessage}
            error={error}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductsPage
            setLoading={setLoading}
            setError={setError}
            setMessage={setMessage}
            error={error}
          />
        </TabPanel>
      </Container>
      <SuccessDialog setOpen={setError} open={error} message={message} />
      {loading && <CircularProgress className="admin-loading" />}
    </div>
  );
}

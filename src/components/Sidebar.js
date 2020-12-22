import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import GmailSidebarItem from "@mui-treasury/components/sidebarItem/gmail";

import {
  Inbox,
  Star,
  InsertDriveFile,
  People,
  Info,
} from "@material-ui/icons/";

const GmailSidebarItemDemo = () => {
  const [index, setIndex] = React.useState(0);
  const [collapsed, setCollapsed] = React.useState(false);
  const onClick = () => {
    setCollapsed(!collapsed);
  };
  const commonProps = (i) => ({
    selected: index === i,
    onClick: () => setIndex(i),
    collapsed,
    dotOnCollapsed: true,
  });
  return (
    <Box bgcolor={"common.white"} pr={2} minWidth={256}>
      <Button onClick={onClick}>{collapsed ? "Expand" : "Collapse"}</Button>
      <List>
        <GmailSidebarItem
          color={"#da3125"}
          startIcon={<Inbox />}
          label={"Inbox"}
          amount={"1,198"}
          {...commonProps(0)}
          dotOnCollapsed={false}
        />
        <GmailSidebarItem
          startIcon={<Star />}
          label={"Starred"}
          {...commonProps(1)}
        />
        <GmailSidebarItem
          startIcon={<InsertDriveFile />}
          label={<b>Drafts</b>}
          amount={"5"}
          {...commonProps(2)}
        />
        <GmailSidebarItem
          color={"#1a73e8"}
          startIcon={<People />}
          label={<b>Social</b>}
          {...commonProps(3)}
        />
        <GmailSidebarItem
          color={"#e37400"}
          startIcon={<Info />}
          label={"Updates"}
          {...commonProps(4)}
        />
      </List>
    </Box>
  );
};

export default GmailSidebarItemDemo;

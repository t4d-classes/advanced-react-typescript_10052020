import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

import { ToolHeaderMemo as ToolHeader } from './ToolHeader';
import { ToolFooter } from './ToolFooter';

export type CarToolLayoutProps = {
  children: ReactNode;
};

function CarToolHeader() {
  return <ToolHeader headerText="Car Tool" />;
}

export function CarToolLayout({ children }: CarToolLayoutProps) {
  function CarToolFooter() {
    return <ToolFooter companyName="A Cool Company, Inc." />;
  }

  return (
    <Grid container direction="column">
      <Grid item component={CarToolHeader} />
      <Grid item component="main">
        {children}
      </Grid>
      <Grid item component={CarToolFooter} />
    </Grid>
  );
}

import React, { useState, useEffect, useMemo } from 'react';

export const Fixtures = () => {
  const [fixturesData, setFixturesData] = useState(null);

  return (
    fixturesData?.results && (
      <Fixtures
        columns={fixtureColumns}
        data={fixturesData?.results}
        tableClassName="fixture-table"
        theadClassName="fixture-thead"
        thClassName="fixture-th"
        tbodyClassName="fixture-tbody"
        trClassName="fixture-tr"
        tdClassName="fixture-td"
      />
    )
  );
};

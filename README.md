# ReactJs Server Side Table
A React module that can be used for rendering tables with dynamically paginated data.

## Quick Features
- Dynamic pagination
- Sorting by columns
- Searching
- Language support (Currently -> English and Turkish)

## API
|Option| Description|
| --- | --- |
| tableColumns | Columns of the table. Must be same format with the example code. Since this module uses `react-table` as a base package, for more advance usage, you can check out the `react-table` docs and 
use the column properties there.|
| tableData | Array of data that is currently displayed on the table |
| totalDataCount | Total data count that table will be displayed on the all pages. This is used for arranging pagination |
| pageSizes | Array of how many data table shows in a page. **Default=[10, 20, 30, 40, 50]**. You can switch between the numbers for changing how many data will be displayed in a page |
| defaultSortBy | Initial sorting column and direction value. **Default is ascending sorting of the first column** |
| getTableInfo | Option for returning current table information, such as: pageIndex, pageSize, searchText, sortBy, sortDir. You can get the table's current information and get data according to this information |
| language | Language of the table. **Default="tr"**. Supported values for this options: "tr" for Turkish and "en" for English |
| tableStyle | Inline style for table's `<table>` tag |
| theadStyle | Inline style for table's `<thead>` tag |
| thStyle | Inline style for table's `<th>` tag |
| tbodyStyle | Inline style for table's `<tbody>` tag |
| trStyle | Inline style for table's `<tr>` tag |
| tdStyle | Inline style for table's `<td>` tag |


## Sample Code

**NOTE**: Column accessor values must match with data element keys. For example if accessor value is `ticket_id`, then data should be `[{ticket_id: 1, ...etc}, ...etc]`

```js
import React, { useEffect, useState } from 'react';
import ServerSideTable from 'reactjs-server-side-table';

  function App() {
    const columns =  [
        {
          Header: "Ticket No",
          accessor: 'ticket_id'
        },
        {
          Header: `Reference`,
          accessor: 'reference',
          Cell: ({ row: { original } }) => (
            <div>
                {original.reference ? original.reference : '-'}
            </div>
          )
        }
      ]

    const [ticketList, setTicketList] = useState([]);
    const [ticketCount, setTicketCount] = useState(0);
    const [tableInfo, setTableInfo] = useState({});

    useEffect(() => {
  
      fetchTickets();
  
    }, [tableInfo]);

    const fetchTickets = () => {
        //fetch new data with tableInfo state
    }

    return (
      <div>
        {
          ticketList.length > 0 && ticketCount > 0 ? 
  
            <ServerSideTable
            tableColumns={columns}
            tableData={ticketList}
            totalDataCount={ticketCount}
            pageSizes={[10, 50, 100]}
            defaultSortBy={[{id: 'ticket_id', desc: true}]}
            getTableInfo={info => setTableInfo(info)}
            tableStyle={{backgroundColor: "red"}}
            language='en'
            />
    
            : <></>
  
        }

      </div>
    );

  }

```

``tableInfo`` state returns:
```js
{sortBy: 'ticket_id', sortDir: 'desc', pageIndex: 1, pageSize: 10, searchText: ''}
```
So you can use this information and fetch new data from your server.
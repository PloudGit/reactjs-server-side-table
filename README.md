# ReactJs Server Side Table
A React module that can be used for rendering tables with dynamically paginated data.

## Quick Features
- Dynamic pagination
- Sorting by columns
- Searching
- Language support (Currently -> English and Turkish)

## Installation

``npm install reactjs-server-side-table``

## API
|Option|Description|Required|Default Value|
| --- | --- | --- | --- |
| tableColumns | Columns of the table. Must be same format with the example code. Since this module uses `react-table` as a base package, for more advance usage, you can check out the `react-table` docs and use the column properties there.| **true** | **-** |
| tableData | Array of data that is currently displayed on the table. | **true** | **-** |
| totalDataCount | Total data count that table will be displayed on the all pages. This is used for arranging pagination. | **true** | **-** |
| pageSizes | Array of how many data will be displayed on a page. You can switch between the numbers for changing how many data will be displayed on a page. | **false** | **[10, 20, 30, 40, 50]** |
| defaultSortBy | Initial sorting column and direction value.  | **false** | **First column - ascending order** |
| getTableInfo | Option for returning current table information, such as: pageIndex, pageSize, searchText, sortBy, sortDir. You can get the table's current information and get data according to this information. | **-** | **-** |
| language | Language of the table. Supports: **"tr"** for Turkish and **"en"** for English. | **false** | **en** |
| tableStyle | Inline style for table's `<table>` tag | **false** | **-** |
| theadStyle | Inline style for table's `<thead>` tag |**false** | **-** |
| thStyle | Inline style for table's `<th>` tag |**false** | **-** |
| tbodyStyle | Inline style for table's `<tbody>` tag |**false** | **-** |
| trStyle | Inline style for table's `<tr>` tag |**false** | **-** |
| tdStyle | Inline style for table's `<td>` tag |**false** | **-** |


## Sample Code

**NOTE:** Column accessor values must match with keys from the elements of the data. For example if accessor value is `ticket_id`, then data should be `[{ticket_id: 1, ...etc}, ...etc]`

For more information about columns: [React-Table](https://react-table.tanstack.com/)

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
            tableStyle={{backgroundColor: "#bbbbbb"}}
            language='en'
            />
    
            : <></>
  
        }

      </div>
    );

  }

```
You can fetch your data with the current tableInfo state from your server.

## Table Information
``tableInfo`` state returns this:
```js
{sortBy: 'ticket_id', sortDir: 'desc', pageIndex: 3, pageSize: 10, searchText: '2'}
```
``totalDataCount`` = 41

for a table like this:

![table](https://i.imgur.com/dsxxk2w.png=500x250)

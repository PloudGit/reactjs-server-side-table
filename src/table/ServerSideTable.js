import React, { useEffect, useState, useMemo, useImperativeHandle, useRef, Fragment } from "react";
import { usePrevious } from "../custom_hooks/usePrevious";
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from "react-table";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";

export default function ServerSideTable({
  tableColumns,
  pageSizes = [10, 20, 30, 40, 50],
  tableData,
  totalDataCount,
  defaultSortBy = [{ id: tableColumns[0].accessor, desc: false }],
  getTableInfo,
  tableStyle = {},
  theadStyle = {},
  thStyle = {},
  tbodyStyle = {},
  trStyle = {},
  tdStyle = {},
  language = "en",
}) {
  const columns = useMemo(() => tableColumns, []);

  const [itemPerPage, setItemPerPage] = useState(10);

  const [searchText, setSearchText] = useState("");
  const prevSearchText = usePrevious({ searchText });

  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({});

  const data = useMemo(() => tableData);

  const tableInstanceRef = useRef(null);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, sortBy: defaultSortBy },
      manualSortBy: true,
      manualPagination: true,
      manualFilters: true,
      autoResetPage: false,
      pageCount: parseInt(totalDataCount / itemPerPage) + 1,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, globalFilter },
  } = tableInstance;

  useImperativeHandle(tableInstanceRef, () => tableInstance);

  useEffect(() => {
    let isSearchTextChanged = false;

    if (prevSearchText) isSearchTextChanged = prevSearchText.searchText !== searchText;

    let info = {
      sortBy: sortBy.length > 0 ? sortBy[0].id : "ticket_id",
      sortDir: sortBy.length > 0 ? (sortBy[0].desc ? "desc" : "asc") : "desc",
      pageIndex: isSearchTextChanged ? 1 : pageIndex + 1,
      pageSize: pageSize,
      searchText: searchText,
    };

    gotoPage(info.pageIndex - 1);

    getTableInfo(info);
    setItemPerPage(pageSize);
  }, [pageIndex, pageSize, sortBy, searchText, filter]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      {loading ? (
        <Fragment />
      ) : (
        <div>
          <div>
            {tableData.length <= 0 ? (
              <Fragment />
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <label style={{ marginBottom: 0 }}>
                    {language === "tr" ? "Sayfada" : "Show"} &nbsp;
                    <select
                      style={{ height: "2rem", width: "3rem", borderRadius: 6 }}
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {pageSizes.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                    &nbsp; {language === "tr" ? "tane kayıt gösteriliyor" : "entries"}
                  </label>

                  <div style={{ fontWeight: "bold" }}>
                    {language === "tr" ? "Ara" : "Search"}: &nbsp;
                    <input
                      style={{
                        borderRadius: "6px",
                        borderColor: "darkgray",
                        borderWidth: "1px",
                      }}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <table style={{ ...tableStyle, width: "100%" }} {...getTableProps()}>
                    <thead style={theadStyle}>
                      {headerGroups.map((headerGroup) => (
                        <tr style={trStyle} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => {
                            return (
                              <th
                                style={thStyle}
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                onClick={(e) => {
                                  column.getHeaderProps(column.getSortByToggleProps()).onClick(e);
                                }}
                              >
                                {column.render("Header")} &nbsp;
                                <span>
                                  {column.canSort ? (
                                    column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <BiSortDown />
                                      ) : (
                                        <BiSortUp />
                                      )
                                    ) : (
                                      <BiSort />
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </th>
                            );
                          })}
                        </tr>
                      ))}
                    </thead>

                    <tbody style={tbodyStyle} {...getTableBodyProps()}>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr style={trStyle} {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td style={tdStyle} {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      <tr style={tdStyle}>
                        {loading ? (
                          // Use our custom loading state to show a loading indicator
                          <td colSpan="10000">{language === "tr" ? "Yükleniyor" : "Loading"}...</td>
                        ) : (
                          <td colSpan="10000">
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {language === "tr" ? (
                                <span>
                                  {totalDataCount} sonuçtan {pageIndex * pageSize + 1} - &nbsp;
                                  {page.length < pageSize ? totalDataCount : (pageIndex + 1) * pageSize} tanesi
                                  gösteriliyor
                                </span>
                              ) : (
                                <span>
                                  Showing {pageIndex * pageSize + 1} to&nbsp;
                                  {page.length < pageSize ? totalDataCount : (pageIndex + 1) * pageSize} of{" "}
                                  {totalDataCount} entries
                                </span>
                              )}

                              <span>
                                <div>
                                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    <i className="fas fa-angle-double-left"></i>
                                  </button>{" "}
                                  <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    <i className="fas fa-angle-left"></i>
                                  </button>{" "}
                                  <span style={{ fontSize: "1.1rem" }}>
                                    {language === "tr" ? "Sayfa" : "Page"}{" "}
                                    <strong>
                                      {pageIndex + 1} - {parseInt(totalDataCount / pageSize) + 1}
                                    </strong>{" "}
                                  </span>
                                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                                    <i className="fas fa-angle-right"></i>
                                  </button>{" "}
                                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    <i className="fas fa-angle-double-right"></i>
                                  </button>{" "}
                                  <span>
                                    {language === "tr" ? "Sayfaya git" : "Go to page"}:{" "}
                                    <input
                                      type="number"
                                      value={pageIndex + 1}
                                      onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                      }}
                                      style={{ width: "50px" }}
                                    />
                                  </span>{" "}
                                </div>
                              </span>
                            </span>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

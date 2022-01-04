'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ServerSideTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _usePrevious = require('../custom_hooks/usePrevious');

var _reactTable = require('react-table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ServerSideTable(_ref) {
  var tableColumns = _ref.tableColumns,
      pageSizes = _ref.pageSizes,
      tableData = _ref.tableData,
      totalDataCount = _ref.totalDataCount,
      _ref$defaultSortBy = _ref.defaultSortBy,
      defaultSortBy = _ref$defaultSortBy === undefined ? [{ id: tableColumns[0].accessor, desc: false }] : _ref$defaultSortBy,
      getTableInfo = _ref.getTableInfo,
      _ref$tableStyle = _ref.tableStyle,
      tableStyle = _ref$tableStyle === undefined ? {} : _ref$tableStyle,
      _ref$theadStyle = _ref.theadStyle,
      theadStyle = _ref$theadStyle === undefined ? {} : _ref$theadStyle,
      _ref$thStyle = _ref.thStyle,
      thStyle = _ref$thStyle === undefined ? {} : _ref$thStyle,
      _ref$tbodyStyle = _ref.tbodyStyle,
      tbodyStyle = _ref$tbodyStyle === undefined ? {} : _ref$tbodyStyle,
      _ref$trStyle = _ref.trStyle,
      trStyle = _ref$trStyle === undefined ? {} : _ref$trStyle,
      _ref$tdStyle = _ref.tdStyle,
      tdStyle = _ref$tdStyle === undefined ? {} : _ref$tdStyle,
      _ref$language = _ref.language,
      language = _ref$language === undefined ? "tr" : _ref$language;


  var columns = (0, _react.useMemo)(function () {
    return tableColumns;
  }, []);

  var _useState = (0, _react.useState)(10),
      _useState2 = _slicedToArray(_useState, 2),
      itemPerPage = _useState2[0],
      setItemPerPage = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      searchText = _useState4[0],
      setSearchText = _useState4[1];

  var prevSearchText = (0, _usePrevious.usePrevious)({ searchText: searchText });

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      filter = _useState8[0],
      setFilter = _useState8[1];

  var data = (0, _react.useMemo)(function () {
    return tableData;
  });

  var tableInstanceRef = (0, _react.useRef)(null);

  var tableInstance = (0, _reactTable.useTable)({
    columns: columns,
    data: data,
    initialState: { pageIndex: 0, sortBy: defaultSortBy },
    manualSortBy: true,
    manualPagination: true,
    manualFilters: true,
    autoResetPage: false,
    pageCount: parseInt(totalDataCount / itemPerPage) + 1
  }, _reactTable.useFilters, _reactTable.useGlobalFilter, _reactTable.useSortBy, _reactTable.usePagination);

  var getTableProps = tableInstance.getTableProps,
      getTableBodyProps = tableInstance.getTableBodyProps,
      headerGroups = tableInstance.headerGroups,
      prepareRow = tableInstance.prepareRow,
      page = tableInstance.page,
      canPreviousPage = tableInstance.canPreviousPage,
      canNextPage = tableInstance.canNextPage,
      pageOptions = tableInstance.pageOptions,
      pageCount = tableInstance.pageCount,
      gotoPage = tableInstance.gotoPage,
      nextPage = tableInstance.nextPage,
      previousPage = tableInstance.previousPage,
      setPageSize = tableInstance.setPageSize,
      _tableInstance$state = tableInstance.state,
      pageIndex = _tableInstance$state.pageIndex,
      pageSize = _tableInstance$state.pageSize,
      sortBy = _tableInstance$state.sortBy,
      globalFilter = _tableInstance$state.globalFilter;


  (0, _react.useImperativeHandle)(tableInstanceRef, function () {
    return tableInstance;
  });

  (0, _react.useEffect)(function () {

    var isSearchTextChanged = false;

    if (prevSearchText) isSearchTextChanged = prevSearchText.searchText !== searchText;

    var info = {
      sortBy: sortBy.length > 0 ? sortBy[0].id : 'ticket_id',
      sortDir: sortBy.length > 0 ? sortBy[0].desc ? 'desc' : 'asc' : 'desc',
      pageIndex: isSearchTextChanged ? 1 : pageIndex + 1,
      pageSize: pageSize,
      searchText: searchText
    };

    gotoPage(info.pageIndex - 1);

    getTableInfo(info);
    setItemPerPage(pageSize);
  }, [pageIndex, pageSize, sortBy, searchText, filter]);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', integrity: 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p', crossOrigin: 'anonymous' }),
    loading ? _react2.default.createElement(_react.Fragment, null) : _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        tableData.length <= 0 ? _react2.default.createElement(_react.Fragment, null) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }
            },
            _react2.default.createElement(
              'label',
              { style: { marginBottom: 0 } },
              language === "tr" ? "Sayfada" : "Show",
              ' \xA0',
              _react2.default.createElement(
                'select',
                {
                  style: { height: '2rem', width: '3rem', borderRadius: 6 },
                  value: pageSize,
                  onChange: function onChange(e) {
                    setPageSize(Number(e.target.value));
                  }
                },
                pageSizes.map(function (pageSize) {
                  return _react2.default.createElement(
                    'option',
                    { key: pageSize, value: pageSize },
                    pageSize
                  );
                })
              ),
              '\xA0 ',
              language === "tr" ? "tane kayıt gösteriliyor" : "entries"
            ),
            _react2.default.createElement(
              'div',
              { style: { fontWeight: 'bold' } },
              language === "tr" ? "Ara" : "Search",
              ': \xA0',
              _react2.default.createElement('input', {
                style: {
                  borderRadius: '6px',
                  borderColor: 'darkgray',
                  borderWidth: '1px'
                },
                onChange: function onChange(e) {
                  setSearchText(e.target.value);
                },
                placeholder: ''
              })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'table',
              _extends({
                style: _extends({}, tableStyle, { width: "100%" })
              }, getTableProps()),
              _react2.default.createElement(
                'thead',
                {
                  style: theadStyle
                },
                headerGroups.map(function (headerGroup) {
                  return _react2.default.createElement(
                    'tr',
                    _extends({
                      style: trStyle
                    }, headerGroup.getHeaderGroupProps()),
                    headerGroup.headers.map(function (column) {
                      return _react2.default.createElement(
                        'th',
                        _extends({
                          style: thStyle
                        }, column.getHeaderProps(column.getSortByToggleProps()), {
                          onClick: function onClick(e) {
                            column.getHeaderProps(column.getSortByToggleProps()).onClick(e);
                          }
                        }),
                        column.render('Header'),
                        ' \xA0',
                        _react2.default.createElement(
                          'span',
                          null,
                          column.canSort ? column.isSorted ? column.isSortedDesc ? _react2.default.createElement('i', { className: 'fas fa-sort-down' }) : _react2.default.createElement('i', { className: 'fas fa-sort-up' }) : _react2.default.createElement('i', { className: 'fas fa-sort' }) : ''
                        )
                      );
                    })
                  );
                })
              ),
              _react2.default.createElement(
                'tbody',
                _extends({
                  style: tbodyStyle
                }, getTableBodyProps()),
                page.map(function (row, i) {
                  prepareRow(row);
                  return _react2.default.createElement(
                    'tr',
                    _extends({
                      style: trStyle
                    }, row.getRowProps()),
                    row.cells.map(function (cell) {

                      return _react2.default.createElement(
                        'td',
                        _extends({
                          style: tdStyle
                        }, cell.getCellProps()),
                        cell.render('Cell')
                      );
                    })
                  );
                }),
                _react2.default.createElement(
                  'tr',
                  {
                    style: tdStyle
                  },
                  loading ?
                  // Use our custom loading state to show a loading indicator
                  _react2.default.createElement(
                    'td',
                    { colSpan: '10000' },
                    language === "tr" ? "Yükleniyor" : "Loading",
                    '...'
                  ) : _react2.default.createElement(
                    'td',
                    { colSpan: '10000' },
                    _react2.default.createElement(
                      'span',
                      {
                        style: {
                          display: 'flex',
                          justifyContent: 'space-between'
                        }
                      },
                      language === "tr" ? _react2.default.createElement(
                        'span',
                        null,
                        totalDataCount,
                        ' sonu\xE7tan ',
                        ' ',
                        pageIndex * pageSize + 1,
                        ' - \xA0',
                        page.length < pageSize ? totalDataCount : (pageIndex + 1) * pageSize,
                        ' ',
                        'tanesi g\xF6steriliyor'
                      ) : _react2.default.createElement(
                        'span',
                        null,
                        'Showing ',
                        ' ',
                        pageIndex * pageSize + 1,
                        ' to\xA0',
                        page.length < pageSize ? totalDataCount : (pageIndex + 1) * pageSize,
                        ' ',
                        'of ',
                        totalDataCount,
                        ' entries'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                          'div',
                          null,
                          _react2.default.createElement(
                            'button',
                            {
                              onClick: function onClick() {
                                return gotoPage(0);
                              },
                              disabled: !canPreviousPage
                            },
                            _react2.default.createElement('i', { className: 'fas fa-angle-double-left' })
                          ),
                          ' ',
                          _react2.default.createElement(
                            'button',
                            {
                              onClick: function onClick() {
                                return previousPage();
                              },
                              disabled: !canPreviousPage
                            },
                            _react2.default.createElement('i', { className: 'fas fa-angle-left' })
                          ),
                          ' ',
                          _react2.default.createElement(
                            'span',
                            { style: { fontSize: '1.1rem' } },
                            language === "tr" ? "Sayfa" : "Page",
                            ' ',
                            _react2.default.createElement(
                              'strong',
                              null,
                              pageIndex + 1,
                              ' -',
                              ' ',
                              parseInt(totalDataCount / pageSize) + 1
                            ),
                            ' '
                          ),
                          _react2.default.createElement(
                            'button',
                            {
                              onClick: function onClick() {
                                return nextPage();
                              },
                              disabled: !canNextPage
                            },
                            _react2.default.createElement('i', { className: 'fas fa-angle-right' })
                          ),
                          ' ',
                          _react2.default.createElement(
                            'button',
                            {
                              onClick: function onClick() {
                                return gotoPage(pageCount - 1);
                              },
                              disabled: !canNextPage
                            },
                            _react2.default.createElement('i', { className: 'fas fa-angle-double-right' })
                          ),
                          ' ',
                          _react2.default.createElement(
                            'span',
                            null,
                            language === "tr" ? "Sayfaya git" : "Go to page",
                            ':',
                            ' ',
                            _react2.default.createElement('input', {
                              type: 'number',
                              value: pageIndex + 1,
                              onChange: function onChange(e) {
                                var page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                              },
                              style: { width: '50px' }
                            })
                          ),
                          ' '
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}
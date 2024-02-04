export function getQuery() {
    let search = location.search.replace('?', '')
    let query = {}
    if (search.length > 0) {
        let kvArr = search.split("&")
        for (let kvs of kvArr) {
            let kv = kvs.split("=")
            query[kv[0]] = decodeURIComponent(kv[1])
        }
    }
    return query
}

export function isEmpty(str) {
    return str == null || str.length === 0 || str.trim().length === 0
}

export function jsonDecode(str) {
    return JSON.parse(str)
}

export function parseAnsiTableToJsArray(asciiTable) {
    // 按行分隔并移除分隔线
    const rows = asciiTable.trim().split('\n').filter(row => !/^-+$|^=+$/.test(row));

    // 提取表头，分割后移除空元素
    const headers = rows[0].split('|').map(header => header.trim()).filter(header => header.length > 0);

    // 处理数据行
    const data = rows.slice(1).map(row => // 排除表头
        row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim()) // 移除空单元格和两端空白
    );

    return { headers, data };
}

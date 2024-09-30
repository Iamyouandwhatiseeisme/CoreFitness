function List (props) {
    const formattedTable = props.product;
    
    return (
        <div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>key</th>
                        <th>value</th>
                        <th>position</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td>{formattedTable[0].key}</td>
                        <td>{formattedTable[0].value}</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>{formattedTable[1].key}</td>
                        <td>{formattedTable[1].value}</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>{formattedTable[2].key}</td>
                        <td>{formattedTable[2].value}</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>{formattedTable[3].key}</td>
                        <td>{formattedTable[3].value}</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>{formattedTable[4].key}</td>
                        <td>{formattedTable[4].value}</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>{formattedTable[5].key}</td>
                        <td>{formattedTable[5].value}</td>
                        <td>5</td>
                    </tr>

                </tbody>

            </table>
        </div>
    )

}

export default List; 
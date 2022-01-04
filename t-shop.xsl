<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <body>
                <h1>CCT Merch available at t-shop!</h1>
                <table border="1">
                    <tr bgcolor="#DBF0FF">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    <xsl:for-each select="//product">
                        <tr>
                            <td>
                                <xsl:value-of select="item" />
                            </td>
                            <td>
                                <xsl:value-of select="price" />
                            </td>  
                            <td>
                                <xsl:value-of select="quantity" />
                            </td>                            
                            <td align="center">
                                <input type="text" value="0" size="1" />                               
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
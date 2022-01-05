<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <table border="1" class="indent">
            <thead>
                    <tr bgcolor="#DBF0FF">
                        <th>Product</th>
                        <th>Price in €</th>
                        <th>Buy on click</th>
                    </tr>
            </thead>
            <tbody>
                    <xsl:for-each select="//product">
                        <tr>
                            <td>
                                <xsl:value-of select="item" />
                            </td>
                            <td align="center">
                                <xsl:value-of select="price" />
                             </td>                                                   
                            <td align="center">
                                <input type="button" id="buyButton" onclick="alert('Purchase successful!')" value="BUY"></input>                             
                            </td>
                        </tr>
                    </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

</xsl:stylesheet>
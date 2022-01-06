<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <div class="container-fluid">
            <div class="row">
                <div class="col">

                    <table id="catalogue" border="1" class="indent">
                        <thead>
                            <tr bgcolor="#DBF0FF">
                                <th>Product</th>
                                <th>Price in €</th>
                                <th>Total requested</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="//product">
                                <tr>
                                    <td>
                                        <xsl:value-of select="item" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="price" />
                                    </td>
                                    <td id="qnt_{position()}">
                                        <xsl:value-of select="quantity" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>                    
                    
                </div>                
            </div>
        </div>
    </xsl:template>

</xsl:stylesheet>
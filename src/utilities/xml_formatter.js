
export const xmlFormatter = (sourceXml, declaration) => {
    const xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    const xsltDoc = new DOMParser().parseFromString(`
    <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:strip-space elements="*"/>  
      <xsl:template match="para[content-style][not(text())]">
        <xsl:value-of select="normalize-space(.)"/>
      </xsl:template>
      <!-- Identity transform but preserve b: prefix for bibliography namespace -->
      <xsl:template match="node()|@*">
        <xsl:choose>
          <xsl:when test="namespace-uri() = 'http://schemas.openxmlformats.org/officeDocument/2006/bibliography'">
            <xsl:element name="b:{local-name()}" namespace="http://schemas.openxmlformats.org/officeDocument/2006/bibliography">
              <xsl:apply-templates select="@*|node()"/>
            </xsl:element>
          </xsl:when>
          <xsl:otherwise>
            <xsl:copy>
              <xsl:apply-templates select="@*|node()"/>
            </xsl:copy>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:template>
      <xsl:output indent="yes"/>
    </xsl:stylesheet>
    `, 'application/xml');

    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);
    const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    return `${declaration}\n${new XMLSerializer().serializeToString(resultDoc)}`;
};

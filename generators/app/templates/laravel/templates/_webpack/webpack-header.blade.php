<% for (var css in htmlWebpackPlugin.files.css) { %>
<link href="<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
<% } %>


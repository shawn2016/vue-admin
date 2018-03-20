let host = location.host;
let href = host.split(".");
let domain = "";
switch (href[0]) {
case "scan":
  domain = "https://wgw.rswallet.com";
  break;
case "test-scan":
  domain = "http://test-payapi.rswallet.com";
  break;
default:
  domain = "/api";
  break;
}
export default domain || "";
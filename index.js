// need to use a special fork of boxen without 'term-size' dependency
const boxen = require("boxen");
const chalk = require("chalk");

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const getCard = () => {
  const chk = new chalk.constructor({ level: 2 });
  const linkTitle = chk.green;
  const pale = chk.gray;
  const highlight = chk.cyan;

  const output = `
      ${chk.green.bold("Chris Scharff")}
      Solutions Engineer based in Austin, Texas
  
  
  ${linkTitle("Twitter")}   ${pale("https://")}twitter.com/${highlight(
    "YesMyCircus"
  )}
  ${linkTitle("LinkedIn")}  ${pale("https://")}linkedin.com/in/${highlight(
    "chris-scharff"
  )}
  ${linkTitle("Github")}    ${pale("https://")}github.com/${highlight("cscharff")}
  ${linkTitle("Cloudflare Community")}      ${pale("https://")}community.cloudflare.com/u/${highlight(
    "cscharff"
  )}
  ${linkTitle("SO")}        ${pale(
    "https://"
  )}stackoverflow.com/users/9420561/${highlight("chris-scharff")}
  
            ${pale("https://")}${highlight("demo.dog")}
  `;

  return chk.green(
    boxen(chk.white(output), {
      padding: 1,
      margin: 1,
      borderStyle: "single",
      termColumns: 100
    })
  );
};

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    if (
      url.pathname === "/" && // only root path
      request.method.toLowerCase() === "get" && // only get requests
      userAgent.match(/(curl|libcurl|HTTPie)\//i) // only curl or similar
    ) {
      return new Response(getCard(), { status: 200 });
    } else {
      return fetch(request);
    }
  } catch (err) {
    return fetch(request);
  }
}

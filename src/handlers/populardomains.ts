//import Store from '../posts_store';

export interface Env {
	POPULARDOMAINS: KVNamespace
}

const PopularDomainsSource = "https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/top-domain.csv";

const PopularDomainsSourceData = async (request: Request, env: Env, ctx: ExecutionContext) => {
    return await fetchCSVBasedOnURL(PopularDomainsSource, request, env, ctx);
};

async function fetchCSVBasedOnURL(url: string, request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      };

    const init = {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }

      var finalresp: string = "";

        const response = await fetch(PopularDomainsSource, init).then(res => res.text()).then(d => {
                var lines = d.split("\n");

                var result = [];

                var headers = lines[0].split(",");

                for (var i = 1; i < lines.length-1; i++) {

                    var obj : any = {};
                    var currentline = lines[i].split(",");

                    for (var j = 0; j < headers.length; j++) {
                        let currentlinestring: string = currentline[j];
                        let headersString: string = headers[j];

                        headersString = headersString.replace("\r", "");
                        currentlinestring = currentlinestring.replace("\r", "");

                        obj[headersString] = currentlinestring;
                    }

                    result.push(obj);
                }

                var finalResult = { "rankingEntries": result };

                finalresp =  JSON.stringify(finalResult);
            });
        
        env.POPULARDOMAINS.put(Date.now().toString(), finalresp);

        return new Response(finalresp, {headers});
}

export default PopularDomainsSourceData;
//import Store from '../posts_store';

export interface Env {
	ATTACKLAYER: KVNamespace
}

const AttackLayer3Source = "https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/attack-layer3-traffic.csv";

const AttackLayer3SourceData = async (request: Request, env: Env, ctx: ExecutionContext) => {
    return await fetchCSVBasedOnURL(AttackLayer3Source, request, env, ctx);
};

async function fetchCSVBasedOnURL(url: string, request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

    const init = {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }

      var finalresp: string = "";

        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
          };

        const response = await fetch(AttackLayer3Source, init).then(res => res.text()).then(d => {
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

                    obj[headersString] = currentlinestring;
                }

                result.push(obj);
            }

            finalresp =  JSON.stringify(result);

            env.ATTACKLAYER.put(Date.now().toString(), finalresp);
        });

        return new Response(finalresp, {headers});
}

export default AttackLayer3SourceData;
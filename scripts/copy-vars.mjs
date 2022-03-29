/**
 * Copy variables for a collection from once cmr to another (usually ops to uat)
 *
 * Inputs (specified as variables in this file):
 * - `collectionShortName` (should be the same for both ops and uat)
 * - `provider` - used to ensure that "podaac" variables don't get copied to "pocloud" collections (usually set to "pocloud")
 * - `sourceUrl` - the base url of the cmr to copy variables from (usually ops cmr url)
 * - `destUrl` - the base url of the cmr to copy variables to (usually uat cmr url)
 *
 * Inputs (specified in .env.json)
 * - `destToken` - the EDL token that will allow writing variables to the destination cmr
 *
 * Outputs:
 * - The collection in the destination cmr will have all the same variables as the same
 *   collection in the source cmr.
 */
import * as fs from "fs";
import { searchCollections, searchVariables } from "../service/cmr.mjs";
import axios from "axios";

//========================================================
//
//                      Input Variables
//
//========================================================
const collectionShortName = "VIIRS_N20-OSPO-L2P-v2.61";
const provider = "pocloud";

const sourceUrl = "https://cmr.earthdata.nasa.gov";
const destUrl = "https://cmr.uat.earthdata.nasa.gov";

const config = JSON.parse(fs.readFileSync("./.env.json"));
const destToken = config.token;

//========================================================
//
//                      Script
//
//========================================================
(async function () {
  const sourceCollection = await getOneCollection({
    baseUrl: sourceUrl,
    shortName: collectionShortName,
    provider: provider,
  });

  const sourceVariableData = await getVariableData({
    baseUrl: sourceUrl,
    collection: sourceCollection,
  });

  const destCollection = await getOneCollection({
    baseUrl: destUrl,
    shortName: collectionShortName,
    provider: provider,
  });

  await writeAllVariableData({
    baseUrl: destUrl,
    token: destToken,
    collectionConceptId: destCollection.id,
    variableData: sourceVariableData,
  });
})();

async function getOneCollection({ baseUrl, shortName, provider }) {
  const collections = await searchCollections({
    baseUrl,
    shortName,
    provider,
  });
  if (collections.length !== 1)
    throw new Error("multiple collections returned");
  return collections[0];
}

async function getVariableData({ baseUrl, collection }) {
  const variableIdList = collection.associations?.variables;
  if (!variableIdList) throw new Error("source had not variable associations");

  const variableData = await searchVariables({
    baseUrl,
    variableIdList,
    format: "umm_json",
  });
  return variableData;
}

async function writeAllVariableData({
  baseUrl,
  token,
  collectionConceptId,
  variableData,
}) {
  console.log("writing variable data");
  variableData.forEach((variable) =>
    writeOneVariableData({ baseUrl, token, collectionConceptId, variable })
  );
}

async function writeOneVariableData({
  baseUrl,
  token,
  collectionConceptId,
  variable,
}) {
  const nativeId = variable.meta["native-id"];
  let url = `${baseUrl}/ingest/collections/${collectionConceptId}/variables/${nativeId}`;

  try {
    const res = await axios({
      method: "PUT",
      url,
      headers: {
        "Content-Type": "application/vnd.nasa.cmr.umm+json",
        Authorization: `Bearer ${token}`,
      },
      data: variable.umm,
    });
  } catch (error) {
    console.error(error.response);
  }
}

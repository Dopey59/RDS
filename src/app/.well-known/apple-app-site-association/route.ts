export const dynamic = "force-static";

export function GET() {
  return Response.json({
    applinks: {
      details: [
        {
          appIDs: ["74BLQLWVHY.com.grandjeu.rds"],
          components: [{ "/": "/group/*", comment: "Lien d'invitation de groupe" }],
        },
      ],
    },
  });
}

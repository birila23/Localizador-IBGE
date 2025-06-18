import { QueryTypes } from 'sequelize';
import sequelize from '../database/sequelize.js'

export async function getMapData(req, res) {
    const { sigla, nomeMunicipio } = req.query; 

    if (!sigla || !nomeMunicipio) {
        return res.status(400).json({ error: 'Os parâmetros "sigla" e "nomeMunicipio" são obrigatórios na URL (ex: /map-data?sigla=PE&nomeMunicipio=Recife).' });
    }

    try {
        const queryViewBox = `SELECT getViewBoxEstado(?) AS "viewBoxEstado" FROM estado WHERE sigla ILIKE ?;`;
        const queryPathEstado = `SELECT ST_AsSVG(geom, 0, 6) AS "pathEstado" FROM estado WHERE sigla ILIKE ?;`;
        const queryPathMunicipio = `SELECT ST_AsSVG(geom, 0, 6) AS "pathMunicipio" FROM municipio WHERE nome ILIKE ? AND sigla ILIKE ?;`;

        const [viewBoxResult, pathEstadoResult, pathMunicipioResult] = await Promise.all([
            sequelize.query(queryViewBox, {
                replacements: [sigla, sigla], 
                type: QueryTypes.SELECT
            }),
            sequelize.query(queryPathEstado, {
                replacements: [sigla],
                type: QueryTypes.SELECT
            }),
            sequelize.query(queryPathMunicipio, {
                replacements: [nomeMunicipio, sigla],
                type: QueryTypes.SELECT
            })
        ]);

        if (!viewBoxResult.length || !pathEstadoResult.length || !pathMunicipioResult.length) {
            return res.status(404).json({ error: 'Dados não encontrados. Verifique a sigla e o nome do município.' });
        }
        const responseData = {
            viewBoxEstado: viewBoxResult[0].viewBoxEstado,
            pathEstado: pathEstadoResult[0].pathEstado,
            pathMunicipio: pathMunicipioResult[0].pathMunicipio
        };
        
        res.json(responseData);

    } catch (error) {
        console.error('Erro ao executar as queries:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar dados do mapa.' });
    }
}
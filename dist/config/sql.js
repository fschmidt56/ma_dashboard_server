"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borderQuery = `SELECT jsonb_build_object(
    'type', 'FeatureCollection',
    'features', jsonb_agg(feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type','Feature',
      'id', id,
      'geometry', ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs) - 'id' - 'geom'
    ) AS feature
    FROM (
      SELECT * FROM nabu.koeln
    ) inputs
  ) features;`;
exports.absoluteCasesQuery = `SELECT jsonb_build_object(
    'type', 'FeatureCollection',
    'features', jsonb_agg(feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type','Feature',
      'geometry', ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs) - 'geom'
    ) AS feature
    FROM (
      SELECT id, geom, stt_name, counter
      FROM nabu.koeln
      WHERE counter != 0
      ORDER BY counter DESC
    ) inputs
  ) features;`;
exports.maxAffectedQuery = `SELECT count(id), stt_name FROM nabu.hu_koeln WHERE visited=true GROUP BY stt_name ORDER BY count DESC LIMIT 10;`;
exports.minAffectedQuery = `SELECT count(id), stt_name FROM nabu.hu_koeln WHERE visited=true GROUP BY stt_name ORDER BY count ASC LIMIT 10;`;
exports.minMaxCasesQuery = `SELECT min(counter), max(counter) FROM nabu.koeln;`;
exports.districtNamesQuery = `SELECT stt_name FROM nabu.koeln ORDER BY stt_name;`;
exports.chartQuery = `SELECT round(sum(b.counter::numeric)/count(a.id),5) as besucht,
100-round(sum(b.counter::numeric)/count(a.id),5) as unbesucht
  FROM nabu.koeln b, nabu.hu_koeln a`;
exports.qMaxAffected = `SELECT counter as anzahl, stt_name 
  FROM nabu.koeln
  WHERE counter > 0
  ORDER BY anzahl DESC
  LIMIT 10;`;
exports.qMinAffected = `SELECT counter as anzahl, stt_name 
  FROM nabu.koeln
  WHERE COUNTER > 0
  ORDER BY anzahl ASC
  LIMIT 10;`;
exports.qUserInfo = `SELECT count(id) as count, sum(counter) as summe
FROM nabu.koeln_user
WHERE pseudo != 'default'
GROUP BY pseudo;`;

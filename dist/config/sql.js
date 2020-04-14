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
      SELECT count(b.id), a.geom, a.stt_name  from nabu.hu_koeln b, nabu.koeln a
      WHERE b.visited=true AND ST_WITHIN(b.geom, a.geom)
      GROUP BY a.stt_name, a.geom
      ORDER BY count DESC
    ) inputs
  ) features;`;
exports.minMaxCasesQuery = `SELECT min(a.count), max(a.count) FROM (SELECT count(id) as count FROM nabu.hu_koeln WHERE visited= true GROUP BY stt_name) as a`;
exports.districtNamesQuery = `SELECT stt_name FROM nabu.koeln ORDER BY stt_name;`;

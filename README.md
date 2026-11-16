# 지휘의 계보 · Conductors' lineage

지휘자가 누구에게 배웠고 누구 밑에서 부지휘자·어시스턴트로 일했는지를, 관계마다 출처를 밝히고 되도록 그것을 말하는 출처의 문장을 함께 실은 사이트입니다. 비상업 교육용이며, 지금 판은 독립 검증이 끝나기 전의 **0.1 탐색판**입니다.

A site that draws who taught each conductor and under whom each one worked as an assistant conductor, with its source, and wherever possible the source sentence, beside every relation. It is noncommercial and educational; the current release is **exploratory edition 0.1**, published before independent verification is complete.

- 사이트 · Site: https://bowonkwon.github.io/Conductors-Lineage/

## 내용 · Contents

| 면 · Page | 내용 · What it holds |
|---|---|
| 계보 그림 · Lineage chart | 태어난 해 순으로 놓은 사람들과 스승→제자 화살표, 관계마다 출처 문장 · People by year of birth with teacher-to-pupil arrows and the source sentence for each relation |
| 인물 찾기와 계보 나무 · Find a person | 이름으로 찾아 스승 쪽과 제자 쪽을 세 세대까지 · Look up a name and follow teachers and pupils for three generations |
| 교향악축제 · Orchestra Festival | 예술의전당 교향악축제 1989~2026년 출연 악단과 지휘자 · Orchestras and conductors of the Orchestra Festival at the Seoul Arts Center, 1989–2026 |
| 방법과 출처 · Method and sources | 관계의 종류, 「확정」의 기준, 명단을 고른 규칙, 17개 악단 재임표 · Kinds of relation, what counts as confirmed, how people were chosen, tenure tables of 17 orchestras |
| 알려진 한계 · Known limits | 그리지 않은 것과 확인하지 못한 것 · What is not drawn and what could not be confirmed |

## 관계를 세는 규칙 · How relations are counted

- **정식 수학 · Formal study** — 음악원 과정이나 개인 교습 · a conservatory course or private lessons. 두 수학의 경계는 고르지 않습니다(「알려진 한계」 면). · The line between formal and short study is uneven (see Known limits).
- **부지휘·어시스턴트 · Assistant** — 윗사람의 이름이 출처에 나오는 부지휘자·어시스턴트·코레페티토르. 악장(콘서트마스터)은 넣지 않습니다. · assistant conductor, associate conductor or répétiteur under a named conductor; concertmasters are not counted.
- **짧은 수학 · Short study** — 마스터클래스, 여름 강습 · a master class or a summer course.
- **확정 · Confirmed** — 위키백과가 아닌 출처의 원문에서 그 관계를 말하는 문장을 읽은 경우. **출처 엇갈림 · Sources disagree** — 출처끼리 다른 경우(양쪽을 모두 싣습니다). **후보 · Candidate** — 위키백과에만 있거나 원문을 직접 열지 못한 경우(그리지 않고 데이터 파일에만 둡니다).
- Confirmed: the sentence stating the relation was read in a source other than Wikipedia. Sources disagree: both sides are shown. Candidate: found only in Wikipedia or in a source that was not opened directly; kept in the data file and not drawn.

## 데이터 · Data

`data/` 의 CSV(UTF-8)는 사이트가 쓰는 표입니다. The CSV files in `data/` (UTF-8) are the tables behind the site.

| 파일 · File | 내용 · Contents |
|---|---|
| `persons.csv` | 사람: 번호, 한글·로마자 이름, 생몰년, 위키데이터 번호, 명단 안팎, 표시 · people: ID, Korean and Latin names, years of birth and death, Wikidata ID, on or outside the list, marks |
| `relations.csv` | 관계의 출처 줄 전부(후보 포함): 스승, 제자, 종류, 상태, 과목, 연도, 장소, 출처, 인용 구절, 주소, 확인한 날 · every source row of a relation, candidates included |
| `tenures.csv` | 17개 악단 수장·객원·부지휘 재임표 · tenure tables of 17 orchestras |
| `festival.csv` | 교향악축제 출연 기록 · appearance records of the Orchestra Festival |

- 출처의 문장은 짧은 인용으로만 싣습니다. 사진과 음반 표지는 싣지 않습니다. · Sentences from sources are reproduced only as short quotations. No photographs or record covers are included.
- 자동 수집을 금지한다고 밝힌 사이트는 열지 않았고, 그런 사이트에서 나온 근거는 지웠습니다. · Sites that disallow automated collection were not opened, and evidence that had come from such sites was removed.
- 위키데이터 번호는 사람을 가리키는 데에만 씁니다. · Wikidata IDs are used only to identify people.

## 알려 주세요 · Corrections

틀린 관계, 빠진 출처, 잘못된 이름 표기는 [이슈](https://github.com/BowonKwon/Conductors-Lineage/issues)로 알려 주시면 고칩니다. 출처의 서지와 해당 문장을 함께 적어 주시면 바로 확인할 수 있습니다.

Please report wrong relations, missing sources and misspelled names through the [issues](https://github.com/BowonKwon/Conductors-Lineage/issues). A citation with the sentence in question makes a report quick to check.

## 판 · Versions

- **0.1 탐색판 · exploratory edition** (2026-11) — 계보 그림, 인물 찾기와 계보 나무, 교향악축제, 방법과 출처, 알려진 한계. · Lineage chart, Find a person, Orchestra Festival, Method and sources, Known limits.

## 라이선스 · License

[LICENSE.md](LICENSE.md)

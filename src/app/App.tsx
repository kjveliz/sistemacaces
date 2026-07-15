import { useState } from "react";
import { Toaster } from "sonner";

import EvidenceUploadView from "../pages/EvidenceUploadView";
import DashboardView from "../pages/DashboardView";
import IndicatorView from "../pages/IndicatorView";
import CriteriaView from "../pages/CriteriaView";
import CareersView from "../pages/CareersView";
import LoginView from "../pages/LoginView";

import type {
  View,
  IndicatorDef,
  Career,
} from "../types";

// ── Indicator factory ────────────────────────────────────────
function makeIndicators(
  career: Career,
): IndicatorDef[] {
  return [
    {
      id: "I1",
      num: 1,
      code: "I1",
      name: "Syllabus",
      description:
        "Evalúa la elaboración y actualización de los sílabos de todas las asignaturas del programa, verificando su coherencia con la malla curricular y el perfil de egreso aprobados institucionalmente.",
      formula:
        "(Asignaturas con sílabo actualizado / Total de asignaturas) × 100",
      period: "Período académico vigente",
      purpose:
        "Garantizar que todas las asignaturas cuenten con una planificación curricular formal, actualizada y coherente que oriente efectivamente el proceso de enseñanza-aprendizaje.",
      cohorts: [],
      slots: [
        {
          sourceNum: 1,
          label: "Malla curricular",
          sharedKey: "malla_curricular",
        },
        {
          sourceNum: 2,
          label: "Syllabus",
          sharedKey: "silabos",
        },
        {
          sourceNum: 3,
          label: "Asignaturas",
        },
      ],
    },
    {
      id: "I2",
      num: 2,
      code: "I2",
      name: "Seguimiento de Syllabus",
      description:
        "Verifica el cumplimiento y seguimiento efectivo de los sílabos durante el período académico a través de registros documentados y actas de revisión periódica.",
      formula:
        "EF1(×0.33) + EF2(×0.27) + EF3(×0.20) + EF4(×0.13) + EF5(×0.07) = Valor asignatura × 100",
      period: "Período académico vigente",
      purpose:
        "Asegurar que los docentes cumplen con la planificación del sílabo y que existen mecanismos formales de control y revisión del avance curricular en cada asignatura.",
      cohorts: [],
      slots: [
        {
          sourceNum: 1,
          label: "Syllabus",
          sharedKey: "silabos",
        },
        {
          sourceNum: 2,
          label: "Seguimiento de syllabus",
        },
        {
          sourceNum: 3,
          label: "Actas de revisión",
        },
      ],
    },
    {
      id: "I3",
      num: 3,
      code: "I3",
      name: "Tutorías Académicas",
      description:
        "Evalúa la implementación del sistema institucional de tutorías académicas para el acompañamiento, apoyo y seguimiento al proceso de aprendizaje de los estudiantes.",
      formula:
        "EF1(×0.40) + EF2(×0.30) + EF3(×0.20) + EF4(×0.10) = Valor materia × 100",
      period: "Período académico vigente",
      purpose:
        "Medir la cobertura y efectividad del sistema de tutorías como mecanismo de apoyo al rendimiento académico y como estrategia para reducir la deserción estudiantil.",
      cohorts: [],
      slots: [
        {
          sourceNum: 1,
          label: "Plan de tutorías",
        },
        {
          sourceNum: 2,
          label: "Registros de tutorías",
        },
        {
          sourceNum: 3,
          label: "Informe de tutorías",
        },
        {
          sourceNum: 4,
          label: "Evidencias de atención",
        },
      ],
    },
    {
      id: "I4",
      num: 4,
      code: "I4",
      name: "Tasa de Deserción",
      description:
        "Mide el porcentaje de estudiantes que abandonan sus estudios antes de completar el programa académico, en relación al total de estudiantes matriculados en el período.",
      formula:
        "(Estudiantes desertores / Estudiantes matriculados) × 100",
      period: "Período académico vigente",
      purpose:
        "Identificar el nivel de abandono estudiantil para implementar estrategias de retención, apoyo y mejora de la permanencia académica en la institución.",
      cohorts: [],
      slots: [
        {
          sourceNum: 1,
          label:
            "Estudiantes matriculados 1er nivel",
          sharedKey: "matriculados",
        },
        {
          sourceNum: 2,
          label:
            "Estudiantes matriculados 2do nivel",
        },
        {
          sourceNum: 3,
          label: "Estudiantes desertados",
        },
      ],
    },
    {
      id: "I5",
      num: 5,
      code: "I5",
      name: "Tasa de Titulación",
      description:
        "Mide el porcentaje de estudiantes que culminan su proceso formativo y obtienen su título dentro del período de evaluación establecido por el ente rector.",
      formula:
        "(Número de graduados / Número de matriculados) × 100",
      period:
        "Duración de la carrera + 1 año adicional",
      purpose:
        "Permite al evaluador conocer la eficiencia terminal de cada cohorte y determinar si la institución logra que sus estudiantes concluyan sus estudios satisfactoriamente.",
      cohorts: [],
      slots: [
        {
          sourceNum: 1,
          label: "Estudiantes matriculados",
          sharedKey: "matriculados",
        },
        {
          sourceNum: 2,
          label: "Estudiantes graduados",
        },
        {
          sourceNum: 3,
          label: "Informe de titulación",
        },
        {
          sourceNum: 4,
          label: "Malla curricular",
          sharedKey: "malla_curricular",
        },
      ],
    },
  ].map((indicator) => ({
    ...indicator,
    slots: indicator.slots.map((slot) => ({
      ...slot,
    })),
  }));
}

// ── App ──────────────────────────────────────────────────────
export default function App() {
  const [view, setView] =
    useState<View>("login");

  const [career, setCareer] =
    useState<Career | null>(null);

  const [indicators, setIndicators] =
    useState<IndicatorDef[]>([]);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [
    selectedCohort,
    setSelectedCohort,
  ] = useState<string>("B 2025");

  const [selectedPAO, setSelectedPAO] =
    useState<number>(1);

  const selected = indicators.find(
    (indicator) =>
      indicator.id === selectedId,
  );

  function selectCareer(
    selectedCareer: Career,
  ) {
    setCareer(selectedCareer);

    setIndicators(
      makeIndicators(selectedCareer),
    );

    setSelectedId(null);
    setSelectedCohort("B 2025");
    setSelectedPAO(1);
    setView("criteria");
  }

  function handleSelectIndicator(
    id: string,
    pao?: number,
  ) {
    setSelectedId(id);

    if (pao !== undefined) {
      setSelectedPAO(pao);
    }

    setView("indicator");
  }

  function handleUpload() {
    /*
     * Al ingresar desde el panel general se permite
     * seleccionar cualquiera de los indicadores.
     */
    setSelectedId(null);
    setView("evidUpload");
  }

  function handleIndicatorUpload() {
    /*
     * Al ingresar desde un indicador concreto,
     * se conserva selectedId.
     */
    setView("evidUpload");
  }

  function handleCohortChange(
    newCohort: string,
  ) {
    if (newCohort === selectedCohort) {
      return;
    }

    setSelectedCohort(newCohort);
    setSelectedId(null);
    setSelectedPAO(1);

    /*
     * Limpia de la interfaz los archivos, resultados
     * y relaciones correspondientes a la cohorte anterior.
     *
     * Al entrar nuevamente en la carga de evidencias,
     * el sistema consultará MySQL usando la nueva cohorte.
     */
    if (career) {
      setIndicators(
        makeIndicators(career),
      );
    }

    setView("dashboard");
  }

  function handleBackToCareers() {
    setCareer(null);
    setIndicators([]);
    setSelectedId(null);
    setSelectedCohort("B 2025");
    setSelectedPAO(1);
    setView("careers");
  }

  function handleLogout() {
    setCareer(null);
    setIndicators([]);
    setSelectedId(null);
    setSelectedCohort("B 2025");
    setSelectedPAO(1);
    setView("login");
  }

  return (
    <>
      <Toaster
        richColors
        position="bottom-right"
      />

      {view === "login" && (
        <LoginView
          onLogin={() =>
            setView("careers")
          }
        />
      )}

      {view === "careers" && (
        <CareersView
          onSelect={selectCareer}
          onLogout={handleLogout}
        />
      )}

      {view === "criteria" && career && (
        <CriteriaView
          career={career}
          onSelectDocencia={() =>
            setView("dashboard")
          }
          onBack={() =>
            setView("careers")
          }
          onLogout={handleLogout}
        />
      )}

      {view === "dashboard" && career && (
        <DashboardView
          indicators={indicators}
          career={career}
          cohort={selectedCohort}
          onCohortChange={
            handleCohortChange
          }
          onSelect={
            handleSelectIndicator
          }
          onLogout={handleLogout}
          onUpload={handleUpload}
          onBackToCareers={
            handleBackToCareers
          }
        />
      )}

      {view === "evidUpload" && career && (
        <EvidenceUploadView
          career={career}
          indicators={indicators}
          onChange={setIndicators}
          onBack={() =>
            setView(
              selectedId
                ? "indicator"
                : "dashboard",
            )
          }
          preselectedCohort={
            selectedCohort
          }
          preselectedIndicatorId={
            selectedId ?? undefined
          }
        />
      )}

      {view === "indicator" &&
        selected &&
        career && (
          <IndicatorView
            indicator={selected}
            onBack={() =>
              setView("dashboard")
            }
            career={career}
            cohort={selectedCohort}
            pao={selectedPAO}
            onUpload={
              handleIndicatorUpload
            }
          />
        )}
    </>
  );
}
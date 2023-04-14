export enum ProjectGoal {
  MAXIMIZE = "Maximize",
  MINIMIZE = "Minimize"
}

export enum MeasuredProperty {
  ACTIVITY = "Activity",
  SOLUBILITY = "Solubility",
  THERMOSTABILITY = "Thermostability"
}

export interface IProject {
  projectTitle: string;
  measuredProperty: MeasuredProperty;
  projectGoal: ProjectGoal;

  //OPTIONAL PROPERTY
  proteinPDBID?: string;
  uniprotID?: string;
  proteinAminoAcidSequence?: string;
}

export interface ProjectModel extends IProject { }

var exercise = function () {
    this.ExerciseID = 0;
    this.Name = "";
    this.ExerciseType = 0;
    this.IsCompound = 0;
}


var exercisemuscle = function (exercise) {
    this.ID = 0;
    this.muscleID = new foreignKeyColumn(0, new muscle());
    this.exerciseID = new foreignKeyColumn(exercise.ID, exercise);
    this.percentInvolvment = 0;

}
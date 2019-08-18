# Development Process

The development process, in a nutshell, is as follows:

1. Pick a story from Trello
1. Create a new *feature-branch* (NEVER push directly to `master`)
1. Start development
1. Once your work is commit and ready for review, open a Pull Request (PR)
1. Fix any comments raised on your PR by mentors, commit your changes, and push to your branch
1. Once your PR is approved, merge to master 
1. Go to #1 and repeat

Here are more details:

## Picking a story from Trello

A user story will be added to your project Trello board. It should contain requirements (Acceptance Criteria) about the feature to build.

1. Choose a story from the `ToDo` column (not from `Backlog`)
1. Assign the story to yourself
1. Move the story to `In Development`
1. Make sure you understand the task. Ask for clarifications from the `Product Owner` and `Scrum Master` if you are not sure about anything.

## Starting development

When you are ready to start work on a new ticket/feature you will _always_ create a new feature branch (never on `master`).

- `git checkout master` - switch to the master branch 
- `git pull upstream` - this will get the latest changes from `upstream` to your local master branch (upstream is the repo in the `CodeYourFuture` org, not your fork)
- `git checkout -b name-of-feature` - create a branch for your feature

> Naming convention: Your branch name should describe what you are building, and it should be all in small letters with words separated with a dash, i.e. if you picked up a story about implementing authentication for admins, then your branch can be called `admin-auth`

Now you can work on your local branch to implement the task you have picked.

### Commmit messages

While you are working, make sure you **commit often** so that you don't lose your work. Follow the rules from [Seven rules for great commit messages](https://chris.beams.io/posts/git-commit/#seven-rules)

- `Add form for authentication` - GOOD commit message
- `add form for authentication` - BAD (does not start with a Capital letter)
- `Added form for authentication` - BAD (verb not in the imperative)
- `Form added for authentication` - BAD (does not start with a verb)
- `Fix something` - BAD (unclear message - what was fixed?)
- `Fix email input validation` - GOOD
- `All fixed` - BAD (unclear)

An easy way to remember how to write a good commit message is to complete this sentence:

> In this commit I will...

- Add form authentication
- Fix email validation
- Improve styling of the header component

This short message above is the `Subject` of the commit. You can (and should) add more explanation for your commit in the `Body` of the commit. You add the `Body` by taking two lines breaks after the subject, and write the extra details. The [Seven rules for great commit messages](https://chris.beams.io/posts/git-commit/#seven-rules) has a great explanation on what to write in the body. 

## Open a Pull Request

Once you have finished development and you are happy everything works well:

1. Push the branch to your repo (`origin`)
1. Open a Pull Request against `CodeYourFuture/master` (upstream)
1. Copy/paste the PR link to the ticket on Trello
1. Move the story card to `Mentor Approval` column
1. Ask the mentors for *Code Review*
    - Notify them on Slack to review the PR (also add them as reviewers on the PR if you know their github usernames)
    - If all is good, then the mentor will approve the PR and merges it to `CodeYourFuture/master` branch
    - Otherwise they will add comments on the PR that you should address in new commits, and push to the PR


> We run a formatter ([prettier](https://prettier.io/docs/en/index.html)) and a linter ([eslint](https://eslint.org/docs/user-guide/getting-started)) automatically on your code when you create a commit. This is called a pre-commit hook, and we set it using a package called [Husky](https://github.com/typicode/husky).

> Our Continous Integration (CI) process will build your PR on heroku so that you (and mentors) can check if they work or not. Read more about [Continuous Integration](https://www.thoughtworks.com/continuous-integration).

## Code Reviews

The mentors will come back with comments on your Pull Request. It is important that you address all these comments (and discuss them by adding replies in the PR if you need to).

1. Go through the comments and make sure you understand them
1. `git checkout feature-branch-name` - On your local machine, switch to the branch that the PR relates to
    - This is why it is important to work on separate branches for different stories. You might have picked up another story between the time you submitted your PR, and the mentor reviewed it. So you want to make sure you don't get work on different stories mixed together.
1. Update the branch with the comments on the PR, then commit and push to the branch.
1. Double check the PR was updated with your latest changes and notify your mentor.

### Merge conflicts for PRs

If you get an error that your branch can not be merged, then that means that there are some changes that your team members merged into `upstream` since the time you created your branch. You need to update your local branch from `upstream/master`

1. `git branch` - make sure you are on the correct branch. If you are not, then `git checkout feature-branch-name` to switch to the correct branch
1. `git pull upstream master` - gets the latest changes from upstream
1. Fix any merge conflicts
1. Commit and push after fixing the merge conflicts
    - `git add file.js` - (add specific files instead of `git add .`) 
    - `git commit -m "Implement authentication flow"`
    - `git push origin branch_name`
1. Go back to your Pull Request and make sure it shows the green box that it can be merged.


### Continuous Integration

When you create a PR, 
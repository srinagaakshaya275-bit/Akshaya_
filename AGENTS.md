<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep résumé-derived career and case-study records in a browser-safe shared data module so views use one factual source.
- Use a single scrolling portfolio with accessible filtered case-study dialogs because the content is one cohesive personal profile.
- Serve the original uploaded résumé through its asset pointer so the binary does not inflate the source repository.
